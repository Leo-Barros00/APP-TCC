import { string } from 'yup'

const emailSchema = string()
  .required('É necessário inserir um email')
  .email('E-mail inválido')
const cpfSchema = string()
  .required('É necessário inserir um CPF')
  .test('test-cpf', 'CPF Inválido', (value) => {
    value = value.replace(/[^\d]+/g, '')

    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) return false

    const valueArray = value.split('')

    const validator = valueArray
      .filter((digit, index, array) => index >= array.length - 2 && digit)
      .map((el) => +el)

    const toValidate = (pop: number) =>
      valueArray
        .filter((digit, index, array) => index < array.length - pop && digit)
        .map((el) => +el)

    const rest = (count: number, pop: number) =>
      ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11) %
      10

    return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
  })

interface Validation {
  success: boolean
  errors: string[]
}

export function validateEmail(email: string): Validation {
  try {
    emailSchema.validateSync(email, { abortEarly: false })
  } catch (err: any) {
    return {
      success: false,
      errors: err.errors,
    }
  }

  return {
    success: true,
    errors: [],
  }
}

export function validateCpf(cpf: string): Validation {
  try {
    cpfSchema.validateSync(cpf)
  } catch (err: any) {
    return {
      success: false,
      errors: err.errors,
    }
  }

  return {
    success: true,
    errors: [],
  }
}

export function validateRequired(fieldName: string, value: string): Validation {
  const requiredSchema = string().required(`O campo ${fieldName} é obrigatório`)

  try {
    requiredSchema.validateSync(value, { abortEarly: false })
  } catch (err: any) {
    return {
      success: false,
      errors: err.errors,
    }
  }

  return {
    success: true,
    errors: [],
  }
}
