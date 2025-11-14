
const contacts = () => {
  return (
    <>

 
          <h3 className="font-bold text-lg text-blue-700">Contact Us</h3>
          <p className="py-4 text-gray-800">We'd love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help.</p>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-black">Name</label>
              <input type="text" className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-black">Email</label>
              <input type="email" className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
            </div>
          <div>
              <label className="block text-black">Message</label>
              <input type="text" className="w-full text-black px-9 py-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message here........." />
            </div>
          </form>

        <div className="modal-action">
            <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition " onClick={()=>{
              const dlg = document.getElementById('contacts');
              if (dlg instanceof HTMLDialogElement) dlg.close();
            }}>Close</button>
        <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition">Submit</button></div>
    </>
  )
}

export default contacts
