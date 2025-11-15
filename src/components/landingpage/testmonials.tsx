import man from "../../assets/images/man.png"
import ceo from "../../assets/images/ceo.png"
import woman from "../../assets/images/woman.png"
import lady from "../../assets/images/lady.png"
import { Link } from "react-router"
import Contacts from "./contacts"


function testmonials() {
  return (
   <section id="testimonials" className="px-10 md:px-20 py-16 bg-white text-center">
  <h3 className="text-3xl font-bold text-blue-700 mb-10">What Our Users Say</h3>


     <div className="grid md:grid-cols-4 gap-10 mb-10">
          {[
            { title: "-HR Manager, SoftLabs Ltd", desc: "“ELMS has completely transformed our HR workflow. Leave requests that used to take hours now take minutes.”",img: <img src={lady} alt="icon" /> },
            { title: "-Operations Lead, TechWave Solutions", desc: "“The approval dashboard is simple and intuitive. Our managers love the one-click approval feature.”" ,img: <img src={man}alt="icon" /> },
            { title: "-HR Administrator, BlueEdge Enterprises", desc: "“Real-time leave balance tracking has reduced employee inquiries by more than 70%. It saves us so much time.”", img: <img src={woman} alt="icon" /> },
             { title: "-CEO, NexaDigital", desc: "“We onboarded our entire team in less than a day. The system is clean, fast, and incredibly user-friendly.”", img: <img src={ceo} alt="icon" /> },

          ].map((feature, index) => (
            
            <div key={index} className="bg-gray-100 shadow-md rounded-2xl p-6 hover:shadow-lg">
              <div className="mb-4 flex justify-center rounded-full overflow-hidden w-24 h-24 mx-auto">
                {feature.img}
              </div>
              <p className="text-gray-600 text-lg">{feature.desc}</p>
              <h4 className="text-lg font-bold text-gray-900 mb-2 italic">{feature.title}</h4>

            </div>
          ))}
        </div>





<div
  className="px-10 md:px-20 py-20 text-white text-center flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-300 rounded-2xl"
>
  <h3 className="text-3xl md:text-4xl font-bold mb-4">
    Start managing employee leave the smart way!
  </h3>
  <p className="text-blue-100 mb-8 text-lg max-w-2xl">
    Join hundreds of teams using ELMS to simplify leave requests, approvals, and reporting.
  </p> 

  <div className="flex gap-6">
  <Link to="/register">
  <button
      className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition"
  >
    Start now
  </button></Link>
  


 <button
      className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition"
          onClick={()=>{
        const dlg = document.getElementById('contacts');
        if (dlg instanceof HTMLDialogElement) dlg.showModal();
      }}
  > 
    contact us 
  </button>
  
  <dialog id="contacts" className="modal">
    <div className="modal-box bg-gray-200">
      <Contacts/>
 </div>
  </dialog>

</div>
 



</div>
  
<div className="mockup-code w-full">
  <pre
    data-prefix="~"><code>“Take care of your employees and they’ll take care of your business.”
 <br />— Richard Branson
</code></pre>
</div>

</section>

  )
}

export default testmonials