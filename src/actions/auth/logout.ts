'use server'

// import { signOut } from "@/auth.config";

export const logOutUser = async () => {
  try {
    // await signOut({
    //   redirect: false
    // })
  } catch (error) {
    console.log(error)
  }
}