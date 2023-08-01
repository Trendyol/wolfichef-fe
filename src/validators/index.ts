import type { Package } from '@/types'
import type { AnyObject, ValidationError } from 'yup'
import { array, number, object, ObjectSchema, string } from 'yup'

const packageSchema: ObjectSchema<{
  name: string
  description: string
  installed_size: number
  version: string
}> = object({
  name: string().required(),
  description: string().default(''),
  installed_size: number().required(),
  version: string().required()
})

export const BuildValidation: ObjectSchema<{
  cwd: string | undefined
  entrypoint: string | undefined
  environments: Array<{ key: string; value: string }> | undefined
  image: string
  packages: Package[]
  registry: string
  tag: string
  token: string | undefined
  username: string | undefined
}> = object({
  cwd: string().optional(),
  entrypoint: string().optional(),
  environments: array().optional(),
  image: string().required(),
  packages: array().of(packageSchema).required().min(1),
  registry: string().required(),
  tag: string().required(),
  token: string().optional(),
  username: string().optional(),
})

export const validateForm = <T extends AnyObject>(
  schema: ObjectSchema<T>,
  form: T,
): Promise<void | Record<string, string[]>> =>
  schema
    .validate(form, { abortEarly: false })
    .then(() => {
      return Promise.resolve()
    })
    .catch((errors: ValidationError) =>
      Promise.reject(
        errors.inner.reduce<Record<string, string[]>>((acc, error) => {
          acc[error.path!] = acc[error.path!] || []
          acc[error.path!].push(error.message)
          return acc
        }, {})
      )
    )
