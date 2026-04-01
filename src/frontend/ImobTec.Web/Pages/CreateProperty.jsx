import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Building2, MapPin, Image, Phone, ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { motion } from "framer-motion";

export default function CreateProperty() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState([""]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "apartamento",
    transaction: "venda",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking_spots: "",
    address: "",
    city: "",
    state: "",
    neighborhood: "",
    latitude: "",
    longitude: "",
    contact_phone: "",
    contact_email: "",
    features: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      ...form,
      price: parseFloat(form.price) || 0,
      area: parseFloat(form.area) || 0,
      bedrooms: parseInt(form.bedrooms) || 0,
      bathrooms: parseInt(form.bathrooms) || 0,
      parking_spots: parseInt(form.parking_spots) || 0,
      latitude: parseFloat(form.latitude) || null,
      longitude: parseFloat(form.longitude) || null,
      images: imageUrls.filter((url) => url.trim()),
      features: form.features ? form.features.split(",").map((f) => f.trim()).filter(Boolean) : [],
      status: "ativo",
    };

    await base44.entities.Property.create(data);
    toast({ title: "Imóvel publicado!", description: "Seu anúncio está ativo." });
    navigate("/");
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Voltar</span>
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold mb-2">Anunciar Imóvel</h1>
        <p className="text-muted-foreground mb-8">Preencha as informações do seu imóvel para publicar o anúncio.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-5 h-5 text-primary" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Título do anúncio *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Ex: Apartamento 3 quartos no Centro"
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Descreva o imóvel com detalhes..."
                  className="mt-1.5 min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de imóvel *</Label>
                  <Select value={form.type} onValueChange={(v) => handleChange("type", v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="cobertura">Cobertura</SelectItem>
                      <SelectItem value="kitnet">Kitnet</SelectItem>
                      <SelectItem value="fazenda">Fazenda</SelectItem>
                      <SelectItem value="chácara">Chácara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Transação *</Label>
                  <Select value={form.transaction} onValueChange={(v) => handleChange("transaction", v)}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="aluguel">Aluguel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <Label>Preço (R$) *</Label>
                  <Input type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} placeholder="500000" required className="mt-1.5" />
                </div>
                <div>
                  <Label>Área (m²)</Label>
                  <Input type="number" value={form.area} onChange={(e) => handleChange("area", e.target.value)} placeholder="120" className="mt-1.5" />
                </div>
                <div>
                  <Label>Quartos</Label>
                  <Input type="number" value={form.bedrooms} onChange={(e) => handleChange("bedrooms", e.target.value)} placeholder="3" className="mt-1.5" />
                </div>
                <div>
                  <Label>Banheiros</Label>
                  <Input type="number" value={form.bathrooms} onChange={(e) => handleChange("bathrooms", e.target.value)} placeholder="2" className="mt-1.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vagas garagem</Label>
                  <Input type="number" value={form.parking_spots} onChange={(e) => handleChange("parking_spots", e.target.value)} placeholder="2" className="mt-1.5" />
                </div>
                <div>
                  <Label>Características</Label>
                  <Input value={form.features} onChange={(e) => handleChange("features", e.target.value)} placeholder="Piscina, churrasqueira, varanda" className="mt-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-primary" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Endereço</Label>
                <Input value={form.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="Rua, número" className="mt-1.5" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Bairro</Label>
                  <Input value={form.neighborhood} onChange={(e) => handleChange("neighborhood", e.target.value)} placeholder="Centro" className="mt-1.5" />
                </div>
                <div>
                  <Label>Cidade *</Label>
                  <Input value={form.city} onChange={(e) => handleChange("city", e.target.value)} placeholder="São Paulo" required className="mt-1.5" />
                </div>
                <div>
                  <Label>Estado *</Label>
                  <Input value={form.state} onChange={(e) => handleChange("state", e.target.value)} placeholder="SP" required className="mt-1.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Latitude</Label>
                  <Input type="number" step="any" value={form.latitude} onChange={(e) => handleChange("latitude", e.target.value)} placeholder="-23.5505" className="mt-1.5" />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input type="number" step="any" value={form.longitude} onChange={(e) => handleChange("longitude", e.target.value)} placeholder="-46.6333" className="mt-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Image className="w-5 h-5 text-primary" />
                Fotos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {imageUrls.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const updated = [...imageUrls];
                      updated[i] = e.target.value;
                      setImageUrls(updated);
                    }}
                    placeholder="URL da imagem"
                  />
                  {imageUrls.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => setImageUrls([...imageUrls, ""])}>
                <Plus className="w-4 h-4" />
                Adicionar imagem
              </Button>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5 text-primary" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Telefone</Label>
                <Input value={form.contact_phone} onChange={(e) => handleChange("contact_phone", e.target.value)} placeholder="(11) 99999-9999" className="mt-1.5" />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input type="email" value={form.contact_email} onChange={(e) => handleChange("contact_email", e.target.value)} placeholder="email@exemplo.com" className="mt-1.5" />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2 min-w-[160px]">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Building2 className="w-4 h-4" />}
              {isSubmitting ? "Publicando..." : "Publicar Anúncio"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}