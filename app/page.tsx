import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CardSummaryStats from "@/components/dashboard/CardSummaryStats"
import TableContent from "@/components/dashboard/TableContent"
import { getDocuments, getSummaryCard } from "./dashboard/actions"
import type { SummaryEntity } from "./dashboard/types"

export default async function Page() {
  const [SummaryCardData, documentsData] = await Promise.all([
    getSummaryCard(),
    getDocuments(),
  ])

  return (
    <div className="min-h-svh flex flex-col justify-between bg-zinc-50/50">
      <div>
        <Navbar />
        <main className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col p-.5">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Portal Pengadaan</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <p className="text-xl font-bold font-inter text-primary-dark">Manajemen Dokumen Tender</p>
              <p className="text-sm text-primary-gray">Kelola, verifikasi, dan audit kepatuhan berkas lelang secara terpusat.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
              SummaryCardData?.map((item: SummaryEntity, i: number) => <CardSummaryStats key={i} {...item} />)
            }
          </div>

          <TableContent data={documentsData} />
        </main>
      </div>

      <Footer />
    </div>
  )
}
