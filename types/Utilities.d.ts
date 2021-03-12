export type Replace<Base, Diff> = Omit<Base, keyof Diff> & Diff
