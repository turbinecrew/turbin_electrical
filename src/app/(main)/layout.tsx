import Header from '@/components/custom/header'
import Sidebar from '@/components/custom/sidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar 영역 */}
      <aside>
        <Sidebar />
      </aside>

      {/* 메인 영역 */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header>
          <Header />
        </header>

        {/* Main 콘텐츠 */}
        <main>{children}</main>
      </div>
    </div>
  );
}
