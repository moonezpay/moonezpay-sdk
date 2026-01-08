# MoonezPay SDK

O SDK da MoonezPay é uma biblioteca moderna e eficiente para integração com a plataforma **MoonezPay**, desenvolvida para facilitar operações financeiras e oferecer uma experiência **rápida, segura e descomplicada** em projetos **Node.js**.

Perfeito para desenvolvedores que buscam agilidade na implementação de pagamentos, gestão financeira automatizada e redução de complexidade no código.

## 🎯 Por que usar o MoonezPay SDK?

- Integração rápida e sem complicações
- API moderna e bem documentada
- Gerenciamento automático de autenticação
- Ideal para e-commerce, marketplaces e fintech
- Suporte completo a TypeScript

---

## 📦 Instalação

```bash
npm install moonezpay
```

---

## 🔐 Importar e Configurar

```typescript
import MoonezPay from 'moonezpay'

const moonezpay = new MoonezPay({
  client_id: 'SEU_CLIENT_ID',
  client_secret: 'SEU_CLIENT_SECRET'
})
```

---

## 💳 Gerar Cobrança PIX (Cash In)

Crie cobranças via PIX e receba pagamentos instantâneos com QR Code.

```typescript
const cobranca = await moonezpay.pix.cashIn({
  amount: 150.00,
  external_id: 'venda-98765',
  postbackUrl: 'https://seudominio.com.br/webhook',
  payerQuestion: 'Compra de produto XYZ',
  payer: {
    name: 'Carlos Mendes',
    document: '98765432100',
    email: 'carlos@email.com'
  }
})

console.log('ID da Transação:', cobranca.transactionId)
console.log('QR Code PIX:', cobranca.qrcode)
console.log('Status:', cobranca.status)
```

---

## 💰 Consultar Saldo da Conta

Verifique o saldo disponível em sua conta MoonezPay.

```typescript
const saldo = await moonezpay.pix.balance()

console.log('Saldo Disponível:', saldo.message.balance)
console.log('Código de Status:', saldo.statusCode)
```

---

## 🚀 Realizar Transferência PIX (Cash Out)

Envie pagamentos via PIX de forma simples e segura.

```typescript
const transferencia = await moonezpay.pix.cashOut({
  amount: 75.50,
  description: 'Pagamento ao fornecedor',
  external_id: 'pgto-456',
  creditParty: {
    key: '11122233344',
    keyType: 'CPF',
    name: 'Ana Paula Silva',
    taxId: '11122233344'
  }
})

console.log('Transferência realizada:', transferencia)
```

**Tipos de chave PIX aceitos:**
- `CPF`
- `CNPJ`
- `EMAIL`
- `TELEFONE`
- `CHAVE_ALEATORIA`

---

## 🔄 Autenticação Automática

O SDK gerencia toda a autenticação de forma transparente. O token de acesso é obtido automaticamente e renovado quando necessário, sem intervenção manual.

---

## ⚠️ Tratamento de Erros

```typescript
try {
  const resultado = await moonezpay.pix.cashIn({
    amount: 200.00,
    external_id: 'pedido-999',
    postbackUrl: 'https://seudominio.com.br/webhook',
    payerQuestion: 'Pagamento do pedido 999',
    payer: {
      name: 'Roberto Santos',
      document: '55544433322',
      email: 'roberto@email.com'
    }
  })
  
  console.log('Operação bem-sucedida:', resultado)
} catch (erro) {
  console.error('Mensagem de erro:', erro.message)
  console.error('Código HTTP:', erro.statusCode)
}
```

---

## 📝 Licença

MIT
