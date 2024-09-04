import { loginEndpoint } from "../../spotify";
import logo from "../assets/Spotify_Icon_RGB_Black copy.png";

export default function SpotifyLogin() {
  return (
    <>
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm p-4 bg-[#191414] border-gray-700 rounded-lg shadow sm:p-6">
          <h5 className="mb-3 text-base font-semibold text-white md:text-xl">
            Connect Spotify
          </h5>
          <p className="text-sm font-sans text-white">
            Connect with Spotify so you can use our services
          </p>
          <ul className="my-4 space-y-3">
            <li>
              <a
                href={loginEndpoint}
                className="flex items-center p-3 text-base font-bold text-white rounded-lg bg-gray-800 hover:bg-gray-700 group hover:shadow"
                // MASUKIN LOGO
              >
                <img src="" alt="" />
                <span className="flex-1 ms-3 whitespace-nowrap text-white">
                  Spotify
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-white bg-gray-600 rounded">
                  Sign In
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
