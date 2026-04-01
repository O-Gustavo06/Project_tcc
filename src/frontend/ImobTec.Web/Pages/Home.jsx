import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilters from "../components/property/PropertyFilters";
import PropertyMap from "../components/property/PropertyMap";
import HeroSection from "../components/property/HeroSection";
import { filterProperties } from "../lib/filterProperties";
import { MapPin, LayoutGrid, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [viewMode, setViewMode] = useState("grid");
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
    queryFn: () => base44.entities.Property.list("-created_date", 100),
  });

  const filtered = filterProperties(properties, filters);

  return (
    <div>
      <HeroSection totalProperties={properties.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <PropertyFilters filters={filters} setFilters={setFilters} />

        {/* Results header */}
        <div className="flex items-center justify-between mt-8 mb-6">
          <div>
            <h2 className="font-heading font-bold text-xl">
              {filtered.length} {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
            </h2>
          </div>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="gap-1.5"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              className="gap-1.5"
              onClick={() => setViewMode("map")}
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Mapa</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border/50">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === "grid" ? (
          filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg">Nenhum imóvel encontrado</h3>
              <p className="text-muted-foreground mt-1">Tente ajustar seus filtros de busca</p>
            </div>
          )
        ) : (
          <PropertyMap properties={filtered} className="h-[600px]" />
        )}
      </div>
    </div>
  );
}