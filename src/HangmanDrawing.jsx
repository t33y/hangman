import React from 'react'

const HangmanDrawing = ({incorrectLetters}) =>{
    const head = <div key={0} style={{width:'50px', height:'50px', border:'solid 10px black', borderRadius:'100%', position:'absolute', top:'60px', right:'-30px' }}/>
    const body = <div key={1} style={{width:'10px', height:'100px', backgroundColor:'black', position:'absolute', top:'130px', right:'0px' }}/>
    const left_hand = <div key={2} style={{width:'90px', height:'10px', backgroundColor:'black', position:'absolute', top:'180px', right:'5px', rotate:'30deg', transformOrigin:'right' }}/>
    const right_hand = <div key={3} style={{width:'90px', height:'10px', backgroundColor:'black', position:'absolute', top:'180px', right:'5px', rotate:'150deg', transformOrigin:'right' }}/>
    const left_leg = <div key={4} style={{width:'10px', height:'100px', backgroundColor:'black', position:'absolute', top:'230px', right:'0px', rotate:'30deg', transformOrigin:'top' }}/>
    const right_leg = <div key={5} style={{width:'10px', height:'100px', backgroundColor:'black', position:'absolute', top:'230px', right:'0px', rotate:'-30deg', transformOrigin:'top' }}/>

    const fullBody = [head, body, left_hand, right_hand, left_leg, right_leg]

    return(
        <div style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px'}}>
            {fullBody.slice(0, incorrectLetters.length)}
            <div style={{width:'10px', height:'50px', backgroundColor:'black', alignSelf:'end',position:'absolute', top:'10px' }}/>
            <div style={{width:'130px', height:'10px', backgroundColor:'black', alignSelf:'end' }}/>
            <div style={{width:'10px', height:'400px', backgroundColor:'black'}}/>
            <div style={{width:'250px', height:'10px', backgroundColor:'black'}}/>
        </div>
    )
}

export default HangmanDrawing