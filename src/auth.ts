import type { MoonezPayConfig, TokenResponse } from "./types"

export class AuthManager {
  private config: MoonezPayConfig
  private accessToken: string | null = null
  private tokenExpiry: number | null = null
  private baseURL: string

  constructor(config: MoonezPayConfig) {
    this.config = config
    this.baseURL = config.baseURL || "https://api.moonezpay.com"
  }

  private getBasicAuthHeader(): string {
    const credentials = `${this.config.client_id}:${this.config.client_secret}`
    const base64Credentials = Buffer.from(credentials).toString("base64")
    return `Basic ${base64Credentials}`
  }

  private isTokenValid(): boolean {
    if (!this.accessToken || !this.tokenExpiry) {
      return false
    }
    return Date.now() < this.tokenExpiry - 300000
  }

  async getAccessToken(): Promise<string> {
    if (this.isTokenValid() && this.accessToken) {
      return this.accessToken
    }

    const response = await fetch(`${this.baseURL}/v2/oauth/token`, {
      method: "POST",
      headers: {
        Authorization: this.getBasicAuthHeader(),
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Falha na autenticação: ${response.status} ${response.statusText}`)
    }

    const data = await response.json() as TokenResponse
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + data.expires_in * 1000

    return this.accessToken
  }

  getBaseURL(): string {
    return this.baseURL
  }
}
