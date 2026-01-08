export interface MoonezPayConfig {
  client_id: string
  client_secret: string
  baseURL?: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface Payer {
  name: string
  document: string
  email?: string
}

export type KeyType = "CPF" | "CNPJ" | "EMAIL" | "TELEFONE" | "CHAVE_ALEATORIA"

export interface CreditParty {
  name?: string
  keyType?: KeyType
  key: string
  taxId?: string
}

export interface SplitItem {
  username: string
  percentageSplit: string
}

export interface CashInRequest {
  amount: number
  external_id?: string
  postbackUrl: string
  payerQuestion?: string
  payer?: Payer
  split?: SplitItem[]
}

export interface CashInResponse {
  transactionId: string
  external_id: string
  status: string
  amount: number
  calendar: {
    expiration: number
    dueDate: string
  }
  debtor: {
    name: string
    document: string
  }
  qrcode: string
}

export interface ApiErrorResponse {
  error: string
  message: string
  statusCode: number
}

export interface CashOutRequest {
  amount: number
  description?: string
  external_id?: string
  creditParty: CreditParty
}

export interface CashOutResponse {
  [key: string]: any
}

export interface BalanceResponse {
  statusCode: number
  message: {
    balance: string
  }
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}
