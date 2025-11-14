
import leave from "../../assets/images/timeimage.png"
import manager from "../../assets/images/managerimage.png"
import track from "../../assets/images/track.png"

const features = () => {
  return (
          <section id="features" className="px-10 md:px-20 py-16 bg-gray-50 text-center">

        <h3 className="text-3xl font-bold text-blue-700 mb-10">Key Features</h3>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "Easy Leave Requests", desc: "Employees can apply for leave in seconds.",img: <img src={leave} alt="icon" /> },
            { title: "Manager Approvals", desc: "Quick review and approval workflow." ,img: <img src={manager} alt="icon" /> },
            { title: "Leave Balance Tracking", desc: "View remaining vacation and sick days anytime.", img: <img src={track} alt="icon" /> },
          ].map((feature, index) => (
            
            <div key={index} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                {feature.img}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

      </section>
  )
}

export default features