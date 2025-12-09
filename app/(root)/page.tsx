import Chart from "@/components/Chart";
import { getFiles } from "@/lib/actions/file.actions";

export default async function Home() {
  const files = await getFiles({limit: 10})

  return (
    <div className="dashboard-container">
      <section className="flex flex-col gap-4">
          <Chart />
        
        <div>dashboard cards</div>
      </section>
      <section className="dashboard-recent-files">
        <h2 className="h2 xl:h2 text-light-100">Recent files uploaded</h2>
        
      </section>
    </div>
  );
}
