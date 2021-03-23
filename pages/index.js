import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import {useState, useEffect} from 'react'
import {db, auth} from '../src/services/firebase'
import Link from 'next/link'
export default function Home() {
  const [teamname,setTeamName] = useState("")
  const [team1,setTeam1] = useState({
    name: null,
    Iinnings: 0,
    byes: 0,
    leg_byes: 0,
    name: "",
    no_balls: 0,
    runs: 0,
    teamruns: 0,
    wickets: 0,
    wides: 0,
  });

  const [players1,setPlayers1] = useState([
    {
    balls_faced :0,
    fours:0,
    maidens:0,
    name: "",
    overs: 0,
    runs_conceeded: 0,
    runs_scored:0,
    sixes:0,
    strike_rate:0,
    wickets_taken:0
    }]);


  

  
  async function fetchData()
  {
    const response = db.collection('team1')
    const data = await response.get()
    data.docs.forEach(doc =>{
      // console.log(doc.data())
      setTeam1(doc.data())
      // names.push(doc.data().Name)
    })
    
  }


  async function fetchPlayer()
  {
   
    const playersresp = db.collection('players1')
    const playerdata = await playersresp.get()

    playerdata.docs.forEach(docs=>{
      // console.log(docs.data())
      setPlayers1([docs.data()])
      // console.log(players1)
    })
    
  }

  useEffect(()=>{
    fetchData();
    fetchPlayer();
  }, [])

  function changeName(event){
    event.preventDefault()
    db.collection('team1').doc('KsuewaMQPo6sU7WBwMue').update({
      name: teamname
    })
    setTeam1({...team1, name: teamname})
  }

  function getName(event){
    // console.log(event.target.value)
    setTeamName(event.target.value)

  }

  function sixRun(event){
    
    let newruns
    // console.log(event.target.name)
    if(event.target.name =="0")
    {
      newruns = 0
    }
    else{
      let up = Number(event.target.name)
      newruns = team1.runs + up
    }
    
    
    db.collection('team1').doc('KsuewaMQPo6sU7WBwMue').update({
      runs: newruns
    })
    
    setTeam1({...team1, runs: newruns})
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Cricket Scoreboard</h1>
        </div>
        <div>
          <h2>Team 1 Name: {team1.name}</h2>
          <input name="pernamme" onChange={getName}></input>
          <button onClick={changeName}>Submit Name</button>
          {/* <h2>OVERS: </h2> */}
          <h2>RUNS: {team1.runs}</h2>
          <button name ="6" onClick={sixRun}>6 runs</button>
          <button name ="4" onClick={sixRun}>4 runs</button>
          <button name = "2" onClick={sixRun}>2 runs</button>
          <button name ="1" onClick={sixRun}>1 runs</button>
          <button name ="0" onClick={sixRun}>reset to 0</button>
          <h2>WICKETS: {team1.wickets}</h2>
          <h2>TARGET</h2>
          <h2>RUNS NEEDED</h2>
          <h2>BALLS REM.</h2>

          <Link href="/players">
            <a>Team1</a>
          </Link>
          
          
        </div>
    </div>
  )
}
