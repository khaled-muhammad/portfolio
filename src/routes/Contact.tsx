import GlassyButton from "@/components/GooeyBtn";
import msgIcon from "../assets/icons/msg.svg";
import SimpleGlassyBtn from "@/components/SimpleGlassyBtn";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import * as z from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultAxios } from "@/lib/api";
import { toast } from 'react-toastify';

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string("Phone number is required"),
  message: z.string().min(10, "Message should be at least 10 words.")
})


const ContactRoute = () => {
  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: zodResolver(schema),
  });

  const sendMsg = (data) => {
    defaultAxios.post('messages/', data).then((res) => {
      if ( res.status == 201 ) {
        toast("Message sent successfully.")
        reset();
      } else {
        toast.error("Something wrong happened, please try again later!")
      }
    }).catch(() => {
        toast.error("Something wrong happened, please try again later!")
    });
  };

  return <>
    <Navbar />
    <section
      id="contact"
      className="w-[100vw] min-h-[100vh] relative flex justify-center items-start"
    >
      <form onSubmit={handleSubmit(sendMsg)} className="form min-w-[50%] relative flex flex-col justify-center items-center bg-white/60 backdrop-blur-3xl ring-white/50 ring-3 p-6 rounded-3xl gradient-outline before:rounded-3xl">
        <h2 className="text-4xl text-white/60 font-bold txt-inner-shadow mb-8 text-left w-full">
          Contact Me
        </h2>
        <div className="flex flex-col lg:flex-row gap-5 justify-between w-full">
          <div className="img-container flex justify-center flex-1/2">
            <img
              src={msgIcon}
              alt="icon"
              className="w-full max-w-70 animate-float"
            />
          </div>
          <div className="fields w-full flex flex-col gap-6">
            <div className="relative">
              <input
                type="text"
                id="name"
                className="glassy-input w-full px-5 py-4 rounded-lg focus:outline-none"
                placeholder="Your Name"
                {...register("name")}
                required
              />
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-4 opacity-70 w-6"
              >
                <defs>
                  <linearGradient
                    id="silverGradientX"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#373737FF" />
                    <stop offset="50%" stopColor="#170B0BFF" />
                    <stop offset="100%" stopColor="#5B5B5BFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                  stroke="url(#silverGradientX)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="url(#silverGradient)"
                />
              </svg>
            </div>
            {errors.name && <p>{errors.name.message}</p>}
            <div className="relative">
              <input
                type="email"
                id="email"
                className="glassy-input w-full px-5 py-4 rounded-lg focus:outline-none"
                placeholder="Your Email"
                required
                {...register("email")}
              />
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-4 opacity-70 w-6"
              >
                <defs>
                  <linearGradient
                    id="silverGradientX"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#373737FF" />
                    <stop offset="50%" stopColor="#170B0BFF" />
                    <stop offset="100%" stopColor="#5B5B5BFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 7.99999V13C16 13.7956 16.3161 14.5587 16.8787 15.1213C17.4413 15.6839 18.2043 16 19 16C19.7956 16 20.5587 15.6839 21.1213 15.1213C21.6839 14.5587 22 13.7956 22 13V12C21.9999 9.74302 21.2362 7.55247 19.8333 5.78452C18.4303 4.01658 16.4705 2.77521 14.2726 2.26229C12.0747 1.74936 9.76793 1.99503 7.72734 2.95936C5.68676 3.92368 4.03239 5.54995 3.03325 7.57371C2.03411 9.59748 1.74896 11.8997 2.22416 14.1061C2.69936 16.3125 3.90697 18.2932 5.65062 19.7263C7.39428 21.1593 9.57143 21.9603 11.8281 21.9991C14.0847 22.0379 16.2881 21.3122 18.08 19.94M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79085 9.79086 7.99999 12 7.99999C14.2091 7.99999 16 9.79085 16 12Z"
                  fill="url(#silverGradient)"
                  stroke="url(#silverGradientX)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {errors.email && <p>{errors.email.message}</p>}
            <div className="relative">
              <input
                type="tel"
                id="phone"
                className="glassy-input w-full px-5 py-4 rounded-lg focus:outline-none"
                placeholder="Your Phone"
                required
                {...register("phone")}
              />
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-4 opacity-70 w-6"
              >
                <defs>
                  <linearGradient
                    id="silverGradientX"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#373737FF" />
                    <stop offset="50%" stopColor="#170B0BFF" />
                    <stop offset="100%" stopColor="#5B5B5BFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z"
                  stroke="url(#silverGradientX)"
                  fill="url(#silverGradient)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {errors.phone && <p>{errors.phone.message}</p>}
            <div className="relative">
              <textarea
                id="message"
                className="glassy-input w-full px-5 py-4 rounded-lg focus:outline-none"
                placeholder="Message"
                cols={30}
                rows={10}
                {...register("message")}
              ></textarea>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-4 opacity-70 w-6"
              >
                <defs>
                  <linearGradient
                    id="silverGradientX"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#373737FF" />
                    <stop offset="50%" stopColor="#170B0BFF" />
                    <stop offset="100%" stopColor="#5B5B5BFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13.2C21 14.8802 21 15.7202 20.673 16.362C20.3854 16.9265 19.9265 17.3854 19.362 17.673C18.7202 18 17.8802 18 16.2 18H9.68375C9.0597 18 8.74767 18 8.44921 18.0613C8.18443 18.1156 7.9282 18.2055 7.68749 18.3285C7.41617 18.4671 7.17252 18.662 6.68521 19.0518L4.29976 20.9602C3.88367 21.2931 3.67563 21.4595 3.50054 21.4597C3.34827 21.4599 3.20422 21.3906 3.10923 21.2716C3 21.1348 3 20.8684 3 20.3355V7.8Z"
                  stroke="url(#silverGradientX)"
                  fill="url(#silverGradient)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {errors.message && <p>{errors.message.message}</p>}
            <SimpleGlassyBtn
              bgOpacity={10}
              blurStrength="md"
              rounded="md"
              className="text-slate-500 self-center"
              type="submit"
            >
              Send
              <svg
              width={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="silverGradientX"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#373737FF" />
                    <stop offset="50%" stopColor="#170B0BFF" />
                    <stop offset="100%" stopColor="#5B5B5BFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z"
                  stroke="url(#silverGradientX)"
                  fill="url(#silverGradient)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </SimpleGlassyBtn>
          </div>
        </div>
      </form>
    </section>
    <Footer />
  </>
};

export default ContactRoute;
