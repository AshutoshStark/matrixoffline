'use client'

import toast from 'react-hot-toast';
import './home.css'
import { useState } from "react";
import axios from 'axios';
import LoadingAnimation from '@/components/Loader/LoadingAnimation';

export default function Home() {

  interface StudentProps{
    name:string,
    collage:string,
    course:string,
    year:number | undefined,
    email:string,
    phoneNumber:number | undefined,
    event:string[],
    paymentMode:string,
    registrationMode:string,
    totalAmount:number | undefined,
  }

  const handleNumericalData=(data:any)=>{

    let regex = /^[a-zA-Z]+$/
    return(regex.test(data))
  }

  const handleContent =(contentName:string)=>{
    if(contentName === studentData.event.find(event=>event === contentName)){
      setUserData(prevState => ({
        ...prevState,
        event: prevState.event.filter(event => event !== contentName)
      }));
    }
    else{
      setUserData({
                    ...studentData,
                    event : [...studentData.event, contentName ],
                  });
                }} 
    

  const [studentData,setUserData] = useState<StudentProps>({
    name:'',
    collage:'',
    course:'',
    year: undefined,
    email:'',
    phoneNumber:undefined,
    event:[],
    paymentMode:'',
    registrationMode:'',
    totalAmount:undefined,
  })

  const [loading,setLoading] = useState<boolean>(false)

  const handleChange = (key:string,value:string | string[] | number)=>{    
    setUserData({
      ...studentData,
      [key] : value,
    });
  }

  const handleSubmit =async(e:any)=>{
    e.preventDefault()
    
    const onSubmit = {
      name : studentData.name,
      collage : studentData.collage,
      course : studentData.course,
      year : studentData.year,
      email : studentData.email,
      phoneNumber : studentData.phoneNumber,
      events : studentData.event,
      paymentMode : studentData.paymentMode,
      registrationType : studentData.registrationMode,
      amount : studentData.totalAmount,
    }
    try{
      setLoading(true)
      await axios.post("/api/register",onSubmit).then((response)=>{
        toast.success('🥳 Registration Done Successfully..!')
      setLoading(false)
      })
    }catch(error){
      toast.error("😰 There is an error while uploading the data")
    }
    setUserData({
      name:'',
      collage:'',
      course:'',
      year: undefined,
      email:'',
      phoneNumber:undefined,
      event:[],
      paymentMode:'',
      registrationMode:'',
      totalAmount:undefined,
    })
  }
console.log(studentData);
  return (
      <main className={ loading ? "my-[80%] md:my-[20%]" : "flex min-h-screen flex-col items-center justify-between p-10 md:p-24 overflow-x-hidden"}>
      {loading && <LoadingAnimation/>}
      { loading === false && <form action="" className=" flex flex-col gap-4 md:w-1/3 form">
        <label htmlFor="name" className="text-white text-xl semi-bold"> Name </label>
        <input required value={studentData.name} onChange={(e)=>handleChange('name',e.target.value)} type="text" name="name" id="name" className="rounded-md px-3 py-2 backdrop-blur-3xl bg-transparent border-green-600 border-2 placeholder-slate-400 " placeholder="Name"/>
        <label htmlFor="collage" className="text-white text-xl semi-bold "> College </label>
        <input required value={studentData.collage} onChange={(e)=>handleChange('collage',e.target.value)} type="text" name="collage" id="collage" className="rounded-md px-3 py-2 backdrop-blur-3xl bg-transparent border-green-600 border-2 placeholder-slate-400 " placeholder="College Name"/>
        <label htmlFor="course" className="text-white text-xl semi-bold"> Course </label>
        <input required value={studentData.course} onChange={(e)=>handleChange('course',e.target.value)} type="text" name="course" id="course" className="rounded-md px-3 py-2 backdrop-blur-3xl bg-transparent border-green-600 border-2 placeholder-slate-400 " placeholder="Course"/>
        <label htmlFor="year" className="text-white text-xl semi-bold"> Year </label>
        <input required value={studentData.year === 0 ?  undefined :studentData.year } onChange={(e)=>{ (Number(e.target.value) >= 0  && Number(e.target.value) <= 4) ? handleChange('year',Number(e.target.value)) : toast.error("The Imputed Year is Invalid") }} type="test" name="year" id="year" className="rounded-md px-3 py-2 backdrop-blur-3xl bg-transparent border-green-600 border-2 placeholder-slate-400 " placeholder="Year"/>
        <label htmlFor="email" className="text-white text-xl semi-bold"> Email </label>
        <input required value={studentData.email} onChange={(e)=>handleChange('email',e.target.value)} type="email" name="email" id="email" className="rounded-md px-3 py-2 backdrop-blur-3xl bg-transparent border-green-600 border-2 placeholder-slate-400 " placeholder="Email"/>
        <label htmlFor="phone" className="text-white text-xl semi-bold"> Phone Number </label>
        <input required value={studentData.phoneNumber === 0 ?  undefined :studentData.phoneNumber} onChange={(e)=>{Number(e.target.value) >= 0  ? handleChange('phoneNumber',Number(e.target.value)) : toast.error("The Imputed Year is Invalid")}} type="text" id="phone" name="phone" className="rounded-md px-3 py-2 backdrop-blur-3xl bg-transparent border-green-600 border-2 placeholder-slate-400" placeholder="Phone Number"/>
        <p className="text-white text-xl semi-bold">Events</p>
          <div className="text-white flex flex-col gap-3 my-4">
            <div className="flex justify-between">
              <label htmlFor="liveProj">Live projects</label>
              <input 
              value={"live_projects"}
              checked={studentData.event.find(event=>event === 'live_projects')?true:false} 
              onChange={(e)=>{
                handleContent(e.target.value)
              }} type="checkbox" name="events" id="liveProj" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="gamingTournament">Gaming Tournament</label>
              <input  
              value={"gamingTournament"}
              checked={studentData.event.find(event=>event === 'gamingTournament')?true:false} 
              onChange={(e)=>{
                handleContent(e.target.value)
              }} type="checkbox" name="events" id="gamingTournament" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="insideEdge">Inside Edge</label>
              <input  
              value={"inside_edge"}
              checked={studentData.event.find(event=>event === 'inside_edge')?true:false} 
              onChange={(e)=>{
                handleContent(e.target.value)
              }} type="checkbox" name="events" id="insideEdge" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="ui/ux">UI/UX Design</label>
              <input  
              value={'ui_ux'}
                checked={studentData.event.find(event=>event === 'ui_ux')?true:false} 
                onChange={(e)=>{
                  handleContent(e.target.value)
                }} type="checkbox" name="" id="ui/ux" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="newsSurge">News Surge</label>
              <input  
              value={"news_surge"}
              checked={studentData.event.find(event=>event === 'news_surge')?true:false} 
              onChange={(e)=>{
                handleContent(e.target.value)
              }} type="checkbox" name="events" id="newsSurge" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="dataScience">Data Science</label>
              <input  
              value={'data_science'}
              checked={studentData.event.find(event=>event === 'data_science')?true:false} 
              onChange={(e)=>{
                handleContent(e.target.value)
              }} type="checkbox" name="events" id="dataScience" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="pitchers">Pitchers</label>
              <input  
              value={'pitchers'}
              checked={studentData.event.find(event=>event === 'pitchers')?true:false} 
              onChange={(e)=>{
                handleContent(e.target.value)
              }} type="checkbox" name="events" id="pitchers" />
            </div>
          </div>
        <p className="text-white text-xl semi-bold">Mode Of Payment</p>
          <div className="text-white flex flex-col gap-3 my-4">
            <div className="flex justify-between">
              <label htmlFor="online">Online</label>
              <input required checked={studentData.paymentMode === "Online" ? true:false } onChange={(e)=> handleChange('paymentMode',e.target.value)} type="radio" value={"Online"} name="paymentMode" id="online" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="offline">Offline</label>
              <input required checked={studentData.paymentMode === "Offline" ? true:false } onChange={(e)=>handleChange('paymentMode',e.target.value)} type="radio" value={"Offline"} name="paymentMode" id="offline" />
            </div>
          </div>
        <p className="text-white text-xl semi-bold">Type of registration</p>
          <div className="text-white flex flex-col gap-3 my-4">
            <div className="flex justify-between">
              <label htmlFor="ronline">Online</label>
              <input required  checked={studentData.registrationMode === "Online" ? true:false } onChange={(e)=>handleChange('registrationMode',e.target.value)} type="radio" value={"Online"} name="registrationMode" id="ronline" />
            </div>
            <div className="flex justify-between">
              <label htmlFor="roffline">Offline</label>
              <input required checked={studentData.registrationMode === "Offline" ? true:false }  onChange={(e)=>handleChange('registrationMode',e.target.value)} type="radio" value={"Offline"} name="registrationMode" id="roffline" />
            </div>
          </div>
        <label htmlFor="amount" className="text-white text-xl semi-bold"> Amount </label>
        <input required type="text" name="amount" id="amount"
          value={studentData.totalAmount  === 0 ?  undefined : studentData.totalAmount}
          onChange={(e)=>{ Number(e.target.value) >= 0  ?  handleChange('totalAmount',Number(e.target.value)):toast.error("The Imputed Year is Invalid")}}
        className="rounded-md px-3 py-2 backdrop-blur-3xl bg-transparent border-green-600 border-2 placeholder-slate-400 " 
        placeholder="Total Amount Paid"/>
      <button className='bg-green-600 px-5 py-2 rounded-md focus:bg-green-700' onClick={handleSubmit}> Submit </button>
      </form>}
    </main>
  );
}
