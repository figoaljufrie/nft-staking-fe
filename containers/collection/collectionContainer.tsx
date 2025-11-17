"use client";

import { useState } from "react";
import { useMintedNFTs } from "@/features/nft/hooks/read/useMintedNft";
import DashboardLayout from "@/components/dashboard/layout/dashboardLayout";
import CollectionHeader from "@/components/collection/section/header/collectionHeader";
import CollectionStats from "@/components/collection/section/stats/collectionStats";
import CollectionGrid from "@/components/collection/section/grid/collectionGrid";
import CollectionPagination from "@/components/collection/section/pagination/collectionPagination";
import CollectionLoading from "@/components/collection/section/loading/collectionLoading";
import CollectionError from "@/components/collection/section/error/errorCollection";
import CollectionEmpty from "@/components/collection/section/empty/emptyCollection";

const ITEMS_PER_PAGE = 20;

export default function CollectionContainer() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useMintedNFTs(page, ITEMS_PER_PAGE);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (data && page * ITEMS_PER_PAGE < data.total) {
      setPage(page + 1);
    }
  };

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;
  const startIndex = page * ITEMS_PER_PAGE + 1;
  const endIndex = data ? Math.min((page + 1) * ITEMS_PER_PAGE, data.total) : 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <CollectionLoading />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <CollectionError />
      </DashboardLayout>
    );
  }

  if (!data || data.total === 0) {
    return (
      <DashboardLayout>
        <CollectionEmpty />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <CollectionHeader totalNFTs={data.total} />
      
      <CollectionStats 
        total={data.total}
        shown={data.nfts.length}
        currentPage={page + 1}
      />

      <CollectionGrid nfts={data.nfts} />

      {totalPages > 1 && (
        <CollectionPagination
          page={page}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          total={data.total}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </DashboardLayout>
  );
}