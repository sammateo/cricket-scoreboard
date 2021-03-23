import Head from 'next/head'
import styles from '../styles/players.module.css'
import React from 'react'
import {useState, useEffect} from 'react'
import {db, auth} from '../src/services/firebase'
import Link from 'next/link'

export default function Players(){
    let idVal=0
    // const [teamname,setTeamName] = useState("")
    // const [team1,setTeam1] = useState({
    //     name: null,
    //     Iinnings: 0,
    //     byes: 0,
    //     leg_byes: 0,
    //     name: "",
    //     no_balls: 0,
    //     runs: 0,
    //     teamruns: 0,
    //     wickets: 0,
    //     wides: 0,
    // });
    const [newplayer,setNewPlayer] = useState({
        balls_faced :0,
        captain: false,
        fours:0,
        maidens:0,
        id:0,
        name: "",
        overs: 0,
        runs_conceeded: 0,
        runs_scored:0,
        sixes:0,
        strike_rate:0,
        wickets_taken:0
    })
  const [players1,setPlayers1] = useState([]);
  const [playerID,setPlayerID] = useState([]);


  

  
  // async function fetchData()
  // {
  //   const response = db.collection('team1')
  //   const data = await response.get()
  //   data.docs.forEach(doc =>{
  //     // console.log(doc.data())
  //     setTeam1(doc.data())
  //     // names.push(doc.data().Name)
  //   })
    
  // }

    

  async function fetchPlayer()
  {
    let arr
    let arrID
    const playersresp = db.collection('players1')
    const playerdata = await playersresp.get()

    playerdata.docs.forEach(docs=>{
      
      arr = players1.push(docs.data())
      arrID = playerID.push(docs.id)
      setPlayers1([...players1],arr)
      setPlayerID([...playerID],arrID)
      // setPlayers1([{...players1}])
      
      // console.log(players1)
      
    })
    
  }
// console.log(playerID)
  useEffect(()=>{
    // fetchData();
    fetchPlayer();
  }, [])

function addPlayer(event){
  if(players1.length == 11)
  {
    alert("Full team")
    return

  }
  let arr =[]
    event.preventDefault()
    db.collection('players1').add(newplayer)
    // console.log(newplayer)
    arr = players1.push(newplayer)
    setPlayers1([...players1],arr)
    // console.log(players1)
}
function getPlayerName(event){
    setNewPlayer({...newplayer,name: event.target.value})
}

function removePlayer(event){
  event.preventDefault()
    
    let pos = event.target.name
    // console.log(playerID[pos])
    // console.log(players1[pos].name)
    let deletename = players1[pos].name
    setPlayers1(players1.filter(player=> player.name != deletename))    
    db.collection('players1').doc(playerID[pos]).delete()
}

function makeCaptain(event){
  event.preventDefault()
  let pos = event.target.name
  let found = false
  players1.forEach(player=>{
    if (player.captain == true)
        return
  })
  console.log(event.target.style.backgroundColor="green")
  db.collection('players1').doc(playerID[pos]).update({
    captain: true
  })
    console.log(players1[pos])
  // setPlayers1([{...players1,captain: true}])
}


    return(

        <div className={styles.container}>
            <div>
            <h2>Team1 Players</h2>
            <input name="pernamme" onChange={getPlayerName}></input>
            <button onClick={addPlayer}>Add new Player</button>
            <div className={styles.teamContainer}>
                {players1.map((player,id) => (
                    <div key={id} className={styles.playerstat}>
                        {/* <p>{id}</p> */}
                    <div>
                      <p>Name: {player.name}</p> 
                      {/* <p>{player.captain?console.log("hi"):null}</p> */}
                      <p>Balls Faced: {player.balls_faced}</p>
                      <p>Runs Scored: {player.runs_scored}</p>
                      <p>Runs Conceeded: {player.runs_conceeded}</p>
                    </div>
                    <div>
                      <p>Sixes: {player.sixes}</p>
                      <p>Fours: {player.fours}</p>
                      <p>Maidens : {player.maidens}</p>
                      <p>Strike Rate: {player.strike_rate}</p>
                    </div>
                    <button name={id} onClick={makeCaptain}  className={styles.captainButton}>Captain</button>
                    <button className={styles.removePlayerButton} name={id} onClick={removePlayer}>x</button>
                    {/* <p>{player.id}</p> */}
                    <br></br>

                    
                    </div>
                ))}
                </div>
              
              
          </div>

        </div>
    )
}