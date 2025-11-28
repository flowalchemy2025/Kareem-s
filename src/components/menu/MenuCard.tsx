import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

interface MenuCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  isVeg?: boolean;
}

const MenuCard = ({ image, title, description, price, isVeg }: MenuCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-hover transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
          {isVeg && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-700 border-green-200">
              <Leaf size={12} />
              Veg
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="font-semibold text-primary text-lg">{price}</p>
      </CardContent>
    </Card>
  );
};

export default MenuCard;