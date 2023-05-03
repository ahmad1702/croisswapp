import HeaderImg from '@/assets/img/header.jpeg';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <main className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-foreground">
        <div className='absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center p-5 md:p-10'>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base font-semibold tracking-wide uppercase text-white">
                Welcome to Croisswapp
              </h2>
              <p className="font-cal animate-fade-up bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text md:text-center text-5xl/[3rem] font-bold text-transparent drop-shadow-sm md:text-7xl/[5rem]">
                Convert code snippets with ease
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Croisswapp makes it easy to convert your code snippets from one
                format to another. Simply paste your code, choose the format you
                want to convert to, and let Croisswapp do the rest.
              </p>
            </div>
          </div>
        </div>
        <Image
          src={HeaderImg}
          alt="header"
          priority
          fill
          className='w-full h-full object-cover'
        />
      </main>
    </div>
  );
}

export default HomePage;

