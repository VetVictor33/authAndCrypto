export type Monster = {
  id: number,
  user_id?: number,
  name: string,
  skills: string,
  image_url: string | undefined,
  nickname: string | undefined
}

export type NewMonster = Omit<Monster, 'id'>

export type DetailedMonster = Omit<Monster, 'name'> & { owner: string }