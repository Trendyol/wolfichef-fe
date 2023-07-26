export interface SelectValue {
  isSelected: Function
  option: {
    name: string
    label: string
  }
}

export interface TagValue {
  disabled: boolean
  handleTagRemove: Function
  isSelected: Function
  option: Package & {
    disabled: boolean
  }
}

export interface MultiSelectAPI {
  select: Function
  remove: Function
  clear: Function
}

export interface Package {
  name: string
  description: string
  installed_size: number
  version: string
}

export interface BuildForm {
  cwd: string
  entrypoint: string
  environments: Array<{ key: string; value: string }>
  image: string
  packages: Package[]
  registry: string
  tag: string
  token: string
  username: string
}

export interface Project {
  id: number
  name: string
  container_registry_access_level: boolean
  container_registry_image_prefix: string
}

export interface CurrentUser {
  avatar_url: string
  email: string
  id: number
  name: string
  username: string
}

export interface Token {
  access_token: string
  created_at: number
  expires_in: number
  refresh_token: string
  token_type: string
}
