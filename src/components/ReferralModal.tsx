import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  referrerName: z.string().min(2, "Name must be at least 2 characters"),
  referrerEmail: z.string().email("Please enter a valid email"),
  friendName: z.string().min(2, "Name must be at least 2 characters"),
  friendEmail: z.string().email("Please enter a valid email"),
  course: z.string().min(1, "Please select a course"),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
});

type FormData = z.infer<typeof formSchema>;

const courses = [
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
];

export function ReferralModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referrerName: data.referrerName,
          referrerEmail: data.referrerEmail,
          refereeName: data.friendName,
          refereeEmail: data.friendEmail,
          courseName: data.course
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit referral');
      }

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Referral submitted successfully!",
          description: "We'll notify your friend about this amazing opportunity.",
        });
        reset();
        onClose();
      } else {
        throw new Error(result.message || 'Failed to submit referral');
      }
    } catch (error) {
      console.error('Referral submission error:', error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-6 py-4"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Refer a Friend
              </h2>
              <p className="text-muted-foreground">
                Share the gift of learning and earn rewards
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Your Name</label>
                  <input
                    {...register("referrerName")}
                    className="w-full mt-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your name"
                  />
                  {errors.referrerName && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.referrerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Your Email</label>
                  <input
                    {...register("referrerEmail")}
                    type="email"
                    className="w-full mt-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your email"
                  />
                  {errors.referrerEmail && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.referrerEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Friend's Name</label>
                  <input
                    {...register("friendName")}
                    className="w-full mt-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter friend's name"
                  />
                  {errors.friendName && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.friendName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Friend's Email</label>
                  <input
                    {...register("friendEmail")}
                    type="email"
                    className="w-full mt-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter friend's email"
                  />
                  {errors.friendEmail && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.friendEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Select Course</label>
                  <select
                    {...register("course")}
                    className="w-full mt-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.course && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.course.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label className="text-sm text-muted-foreground">
                    I agree to the terms and conditions
                  </label>
                </div>
                {errors.terms && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Submit Referral"
                )}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
