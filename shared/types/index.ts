// Типы для пользователей
export interface User {
  id: number
  name: string
  email: string
  isActive: boolean
}

// Типы для счетчика
export interface CounterState {
  count: number
  name: string
}

// Типы для состояния пользователей
export interface UserState {
  users: User[]
  currentUser: User | null
  loading: boolean
}

// Типы для API ответов
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Типы для пагинации
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 