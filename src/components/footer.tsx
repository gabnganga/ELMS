


const footer = () => {
  return (
   <footer id="footer" className=" footer sm:footer-horizontal bg-gray-400 text-base-content p-10 pl-30">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Leave requests</a>
    <a className="link link-hover">Leave balance Tracking</a>
    <a className="link link-hover">Manager approvals</a>
  
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">Features</a>
    <a className="link link-hover">Testimonials</a>
    <a className="link link-hover">Contacts</a>


  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="w-80">
      <label>Enter your email address</label>
      <div className="join">
        <input
          type="text"
          placeholder="username@company"
          className="input input-bordered join-item" />
        <button type="button" className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
  )
}

export default footer