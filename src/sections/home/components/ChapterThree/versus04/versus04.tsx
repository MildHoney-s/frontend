import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import './versus04.scss'; // อย่าลืม import ไฟล์ CSS
import VersusScene from '../versusScene/versusScene';

gsap.registerPlugin(ScrollTrigger)


export default function Versus04() {
  

    return (
        <>

            <VersusScene
                playerA={{
                    name: "Mild-R",
                    alias: "Mild-R สาวน้อย Introvert ",
                    src: "public/assets/Character/Versus/Mild-R/Mild_open.png"
                }}
                playerB={{
                    name: "Debirun",
                    alias: "ศัลยแพทย์แห่งความตาย ผู้มาคุมน้ำตาล",
                    text:"นักปราชญ์ที่อยู่เคียงคู่กับชีวิต และเผชิญหน้ากับความตาย เวทย์มนต์ที่ล้อเล่นกับผู้วายชน เนโครเมนเซอร์ ผู้ที่คอยเหนี่ยวรั้งชีวิตที่ดับสูญให้กลับมามีชีวิตอีกครั้ง...'ศัลยแพทย์แห่งความตาย'... ณ บัดนี้สิ่งที่เขานำพามาคือชีวิตหรือความตายกันแน่!!!",
                    src: "public/assets/Character/Versus/Debirun/Debirun_open.png"
                }}
            />

        </>
    )
}
