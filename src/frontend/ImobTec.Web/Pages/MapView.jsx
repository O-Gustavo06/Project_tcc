import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import PropertyMap from "../components/property/PropertyMap";
import PropertyFilters from "../components/property/PropertyFilters";
import PropertyCard from "../components/property/PropertyCard";
import { filterProperties } from "../lib/filterProperties";
import { Skeleton } from "@/components/ui/skeleton";
import { List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MapView() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    transaction: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "all",
    city: "",
  });

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => base44.entities.Property.list("-created_date", 200),
  });

  const filtered = filterProperties(properties, filters);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-full md:w-96 border-r border-border/50 bg-background flex flex-col h-1/2 md:h-full">
          <div className="p-4 border-b border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg">
                {filtered.length} imóveis
              </h2>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSidebar(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <PropertyFilters filters={filters} setFilters={setFilters} />
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                ))
              ) : (
                filtered.map((property, i) => (
                  <PropertyCard key={property.id} property={property} index={i} />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Map */}
      <div className="flex-1 relative h-1/2 md:h-full">
        {!showSidebar && (
          <Button
            className="absolute top-4 left-4 z-[1000] shadow-lg gap-2"
            onClick={() => setShowSidebar(true)}
          >
            <List className="w-4 h-4" />
            Lista
          </Button>
        )}
        <PropertyMap properties={filtered} className="h-full rounded-none border-0" />
      </div>
    </div>
  );
}