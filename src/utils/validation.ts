import { string } from 'yup';

const emailSchema = string().required('É necessário inserir um email').email('E-mail inválido')

interface Validation {
  success: boolean,
  errors: string[]
}

export function validateEmail(email: string): Validation {
  try {
    emailSchema.validateSync(email, { abortEarly: false })
  } catch (err: any) {
    return {
      success: false,
      errors: err.errors
    }
  }

  return {
    success: true,
    errors: []
  }
}

export function validateRequired(fieldName: string, value: string): Validation {
  const requiredSchema = string().required(`O campo ${fieldName} é obrigatório`)

  try {
    requiredSchema.validateSync(value, { abortEarly: false })
  } catch (err: any) {
    return {
      success: false,
      errors: err.errors
    }
  }

  return {
    success: true,
    errors: []
  }
}