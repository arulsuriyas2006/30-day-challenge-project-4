import { useState } from "react"
import { explainExpression } from "./lib/ai";

function App() {
  const [expr,setExpr]=useState("");
  const [result,setResult]=useState("");
  const [aiResponse,setAiResponse]=useState("Type an expression and press =");
  const [loading,setLoading]=useState(false);

  const handleClick=(value)=>{
    setExpr((prev)=>prev+value)
  }
  const handleClear=()=>{
    setExpr("");
    setResult("");
    setAiResponse("Type an expression and press =");
  }
  const handleBack=()=>{
    setExpr((prev)=>prev.slice(0,-1))
  }
  const handleEqual=()=>{
   try{
    const val =eval(expr);
    setResult(val.toString());
    setAiResponse("Press ASK AI to get explanation of this result.")
   }catch(err){
    setResult("Error")
    setAiResponse("An error occurred while evaluating the expression.")
   }
  }

  const handleAskAI=async()=>{
    setLoading(true);
    try{
      const text  =await explainExpression(expr,result)
      setAiResponse(text);
      setLoading(false);
    }catch(err){
      setAiResponse("An error occurred while communicating with the AI.");
      setLoading(false);
    }
  }
  return (
<div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900">
  <div className="max-w-6xl px-6 py-10 mx-auto">
  <div className="mb-8 flex items-center justify-between">
    <h1 className="text-white text-lg font-semibold">AI Calculator</h1>
    <span className="text-white/70 text-sm">BY Suriya</span>
  </div>

  <div className="grid gap-6 lg:grid-cols-2">
  <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-6">
  <div className="mb-4">
     <div className="text-white/60  text-xs uppercase">Expression</div>
     <div className="text-white text-lg min-h-[40px]">{expr || 0}</div>

     <div className="h-px bg-white/20 my-3"></div>

     <div className="text-white/60  text-xs uppercase">Result</div>
     <div className="text-white text-lg min-h-[40px]">{result||0}</div>
  </div>
   <div className="grid grid-cols-4 gap-3">

    <button className="btn danger" onClick={handleClear}>C</button>
    <button className="btn" onClick={handleBack}>B</button>
    <button className="btn"onClick={()=> handleClick("%")}>%</button>
    <button className="btn"onClick={()=> handleClick("+")}>+</button>
    
    <button className="btn"onClick={()=> handleClick("7")}>7</button>
    <button className="btn"onClick={()=> handleClick("8")}>8</button>
    <button className="btn"onClick={()=> handleClick("9")}>9</button>
    <button className="btn"onClick={()=> handleClick("-")}>-</button>

    <button className="btn"onClick={()=> handleClick("4")}>4</button>
    <button className="btn"onClick={()=> handleClick("5")}>5</button>
    <button className="btn"onClick={()=> handleClick("6")}>6</button>
    <button className="btn"onClick={()=> handleClick("*")}>*</button>
    
    <button className="btn"onClick={()=> handleClick("1")}>1</button>
    <button className="btn"onClick={()=> handleClick("2")}>2</button>
    <button className="btn"onClick={()=> handleClick("3")}>3</button>
    <button className="btn"onClick={()=> handleClick("/")}>/</button>

  
    <button className="btn col-span-2"onClick={()=> handleClick("0")}>0</button>
    <button className="btn"onClick={()=> handleClick(".")}>.</button>
    <button className="btn equals"onClick={handleEqual}>=</button>
   </div>
  </div>

  <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-6 relative" >
    <div className="flex items-center justify-between">
      <h1 className="text-white font-semibold">AI Respose</h1>
      <button className="btn"onClick={handleAskAI} disabled={loading}>{loading?"Thinking...":"ASK AI"}</button>
    </div>
    <p className="text-white/90 text-sm min-h-[140px]">{aiResponse}</p>
    <div className="w-full text-center text-white/60 text-sm absolute bottom-5 left-0">We only send the final expression and result when you click "ASK AI".</div>
  </div>
  </div>
  </div>
</div>
  )
}

export default App
