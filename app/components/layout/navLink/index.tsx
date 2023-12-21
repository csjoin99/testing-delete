"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Typography } from '@mui/material';


interface Props {
    path:string;
    text:string;

}
const styles = {
    link:{
        position:"relative",
        padding:'8px',
        color:'#005A28',
    },
    activeLink:{
        position:"relative",
        color:'#005A28',
        padding:'8px',
        "&:after":{
            content:'""',
            position:"absolute",
            bottom:0,
            left:0,
            width: '100%',
            height: '3px',
            backgroundColor:"#005A28"
        }
    }
}
export default function NavLink({path, text}:Props) {
    const pathname = usePathname()
    const isActive = pathname === path
  return (
    <Link href={path} style={{textDecoration:'none'}}>
        <Typography variant='h3' sx={isActive ? styles.activeLink : styles.link} >{text}</Typography>
    </Link>
  )
}
