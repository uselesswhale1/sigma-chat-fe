import { atom } from 'jotai'
import { Chat, User } from './models'
import { anonymUser } from './mocks'

export const userAtom = atom<User>(anonymUser)
export const chatAtom = atom<Chat | null>(null);

// const countryAtom = atom('Japan')
// const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])
// const mangaAtom = atom({ 'Dragon Ball': 1984, 'One Piece': 1997, Naruto: 1999 })