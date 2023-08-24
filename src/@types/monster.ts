export type Monster = {
  id: number,
  user_id: number,
  name: string,
  skills: string,
  image: string | undefined | null,
  nickname: string | undefined | null
}

export type NewMonster = Omit<Monster, 'id' | 'user_id'>

export type DetailedMonster = Omit<Monster, 'name'> & { owner: string }