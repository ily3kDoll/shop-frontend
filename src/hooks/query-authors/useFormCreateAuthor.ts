import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCreateAuthor = () => {
  const formSchema = z.object({
    name: z.string(),
    date: z.date().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      date: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  return { form, formSchema };
};
