import ActionDropdown from "@/components/ActionDropdown";
import Chart from "@/components/Chart";
import FormattedDateTime from "@/components/FormattedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { FileRow } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const [files, totalSpace] = await Promise.all([
    getFiles({ limit: 10 }),
    getTotalSpaceUsed()
  ])
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container p-4 rounded-2xl">
      <section className="flex flex-col gap-4">
        <Chart used={totalSpace.used}/>

        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Image
                    src={summary.icon}
                    alt="icon"
                    width={200}
                    height={200}
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size)}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-100"/>
                <p className="block text-center text-light-200">Last update</p>
                <FormattedDateTime date={summary.latestDate} className="text-center text-light-100"/>                
              </div>
            </Link>
          ))}
        </ul>
      </section>
      <section className="dashboard-recent-files h-full!">
        <h2 className="h2 xl:h2 text-light-100 mb-5">Recent files uploaded</h2>
        {files.length === 0 ? (
          <p>No recent files</p>
        ) : (
          <ul className="space-y-4">
            {files.rows.map((file: FileRow) => (
              <Link href={file.url} target="_blank" key={file.$id} className="flex justify-between">
                <div className="flex gap-3">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                  />
                  <div className="flex flex-col">
                    <span className="recent-file-name truncate">
                      {file.name}
                    </span>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="recent-file-date"
                    />
                  </div>
                </div>
                <ActionDropdown file={file} />
              </Link>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
