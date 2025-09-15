import { Card } from "@/types";
import Link from "next/link";


async function GamePage() {
  const teste = await fetch("http://localhost:3000/api/game/start");
  const data = await teste.json();
  console.log(data);
  return (
    <div>
      <Link href="/">Go to Home</Link>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-center">Game Page</h1>
        <div className="flex flex-wrap justify-center">
          {data.map((card: Card) => (
            <div key={card.id} className="border p-2 m-2 flex flex-row gap-2">
              {card.value}-{card.suit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
