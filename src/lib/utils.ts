/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import fs from 'fs'
import { Post } from '@/common-types/types'

export function readFile(fileName: string) {
  const pathToFile = path.join(
    process.cwd(),
    `public/content/${fileName}`
  )
  const fileContent = fs.readFileSync(pathToFile, 'utf-8')

  return fileContent
}

export function writePostsToFile(posts: Post[]) {
  const filePath = path.join(process.cwd(), 'public/content/posts.json')
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8')
}

export function formDataToObject(formData: FormData) {
  const obj: Record<string, any> = {}

  formData.forEach((value, key) => {
    // Handle multiple values
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value)
      } else {
        obj[key] = [obj[key], value]
      }
    } else {
      // Convert specific fields (e.g., checkboxes) from string to boolean
      if (value === 'true' || value === 'on') {
        obj[key] = true
      } else if (value === 'false') {
        obj[key] = false
      } else {
        obj[key] = value
      }
    }
  })

  return obj
}
