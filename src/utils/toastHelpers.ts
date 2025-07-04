
import { toast } from '@/hooks/use-toast';

export const showSuccessToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: "bg-cream border-forest-green/30 shadow-lg font-garamond",
  });
};

export const showErrorToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: "destructive",
    className: "bg-red-50 border-red-200 shadow-lg font-garamond",
  });
};

export const showInfoToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: "bg-cream border-muted-brown/30 shadow-lg font-garamond",
  });
};

export const showWarningToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: "bg-yellow-50 border-yellow-200 shadow-lg font-garamond",
  });
};
