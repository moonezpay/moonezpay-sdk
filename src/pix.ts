import type { AuthManager } from "./auth"
import type { CashInRequest, CashInResponse, CashOutRequest, CashOutResponse, BalanceResponse, ApiError, ApiErrorResponse } from "./types"

export class Pix {
  private authManager: AuthManager

  constructor(authManager: AuthManager) {
    this.authManager = authManager
  }

  async cashIn(data: CashInRequest): Promise<CashInResponse> {
    const token = await this.authManager.getAccessToken()
    const baseURL = this.authManager.getBaseURL()

    const response = await fetch(`${baseURL}/v2/pix/qrcode`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json() as CashInResponse | ApiErrorResponse

    if (!response.ok) {
      const error: ApiError = {
        error: 'error' in responseData ? responseData.error ?? 'Erro na API' : 'Erro na API',
        message: 'message' in responseData ? responseData.message ?? 'Falha ao criar depósito PIX' : 'Falha ao criar depósito PIX',
        statusCode: response.status,
      }
    
      throw error
    }    

    return responseData as CashInResponse
  }
  async cashOut(data: CashOutRequest): Promise<CashOutResponse> {
    const token = await this.authManager.getAccessToken()
    const baseURL = this.authManager.getBaseURL()
  
    const response = await fetch(`${baseURL}/v2/pix/payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  
    const responseData = await response.json() as CashOutResponse | ApiErrorResponse
  
    if (!response.ok) {
      const error: ApiError = {
        error: 'error' in responseData
          ? responseData.error ?? "Erro na API"
          : "Erro na API",
        message: 'message' in responseData
          ? responseData.message ?? "Falha ao realizar saque PIX"
          : "Falha ao realizar saque PIX",
        statusCode: response.status,
      }
  
      throw error
    }
  
    return responseData as CashOutResponse
  }  

  async balance(): Promise<BalanceResponse> {
    const token = await this.authManager.getAccessToken()
    const baseURL = this.authManager.getBaseURL()
  
    const response = await fetch(`${baseURL}/v2/balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  
    const responseData = await response.json() as BalanceResponse | ApiErrorResponse
  
    if (!response.ok) {
      const error: ApiError = {
        error: 'error' in responseData
          ? responseData.error ?? "Erro na API"
          : "Erro na API",
        message: 'message' in responseData && typeof responseData.message === 'string'
          ? responseData.message ?? "Falha ao obter saldo"
          : "Falha ao obter saldo",
        statusCode: response.status,
      }
  
      throw error
    }
  
    return responseData as BalanceResponse
  }  
}
