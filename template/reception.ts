import { category, gender, grade, individualOrGroup, major, musicOrPose } from "./inputTypes"

export type Reception2025 = {
    timestamp: Date
    // individualOrGroup: individualOrGroup
    name: string
    gender: gender
    birth: string
    contact: string
    email: string
    school: string
    // leaderGrade: string | null
    academy: string
    instructorName: string
    instructorContact: string
    major: major
    grade: grade
    // category: category
    artTitle: string | null
    musicFileURL: string | null
    musicOrPose: musicOrPose | null
    // participants: string[]
}


export type Reception2024 = {
    timestamp: Date
    individualOrGroup: individualOrGroup
    name: string
    gender: gender
    birth: string
    contact: string
    email: string
    school: string
    leaderGrade: string | null
    academy: string
    instructorName: string
    instructorContact: string
    major: major
    grade: grade
    category: category
    artTitle: string | null
    musicFileURL: string | null
    musicOrPose: musicOrPose | null
    participants: string[]
}