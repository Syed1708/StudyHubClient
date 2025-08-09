
import { Link, NavLink } from "react-router";

export default function Banner() {
  return (
  <div
    className="hero h-[80vh]"
    style={{
      backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1671069848005-7231fc25703f?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="text-center text-neutral-content">
      <div className="max-w-xl">
        <h1 className="mb-5 text-5xl font-bold">Join a Study Session Today</h1>
        <p className="mb-5">Learn, Grow, and Connect with passionate learners and top tutors.</p>
        {/* <link to="/study-sessions" className="btn btn-primary">Explore Sessions</link> */}
        <Link to="/sessions">
            <button className="btn btn-primary">Explore Sessions</button>
        </Link>
      </div>
    </div>
  </div>


  )
}
