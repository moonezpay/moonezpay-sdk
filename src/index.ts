import type { MoonezPayConfig } from "./types"
import { AuthManager } from "./auth"
import { Pix } from "./pix"

export class MoonezPay {
  private authManager: AuthManager
  public pix: Pix

  constructor(config: MoonezPayConfig) {
    if (!config.client_id || !config.client_secret) {
      throw new Error("client_id e client_secret são obrigatórios")
    }

    this.authManager = new AuthManager(config)
    this.pix = new Pix(this.authManager)
  }
}

export * from "./types"

export default MoonezPay
