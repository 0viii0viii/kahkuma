export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 border-b border-[#FFD700] border-dashed border-b-2">
      <h1 className="text-3xl font-bold text-white mb-6">About</h1>

      <div className="space-y-6">
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Artist</h2>
          <p className="text-white mb-2">
            <span className="font-semibold">김희현 (Heehyun Kim)</span>
          </p>
          <p className="text-gray-300 text-sm">
            카쿠마의 창작자이자 아티스트입니다. 독특한 시각적 스타일과 창의적인 표현으로 새로운 예술적 경험을
            선사합니다.
          </p>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <div>
              <p className="text-white font-semibold cursor-pointer hover:text-pink-500">
                <a href="https://www.instagram.com/kahkuma" target="_blank" rel="noopener noreferrer">
                  @kahkuma
                </a>
              </p>
              <p className="text-gray-300 text-sm">최신 작품과 소식을 인스타그램에서 확인하세요</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">About Kahkuma</h2>
          <p className="text-gray-300">
            카쿠마는 독창적인 예술적 비전을 통해 새로운 경험을 창조하는 브랜드입니다. 김희현 아티스트의 독특한 시각과
            창의성이 담긴 작품들을 통해 예술의 새로운 가능성을 탐구합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
