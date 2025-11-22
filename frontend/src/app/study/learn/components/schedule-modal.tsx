import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPreference } from "./progress-sidebar";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  userId: any;
  totalLessons: number;
  totalVocabulary: number;
  initialData: UserPreference | null; // 🆕 Add this prop
}

export default function ScheduleModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
}: ScheduleModalProps) {
  const [formData, setFormData] = useState({
    freetime: "",
    schedule: "",
  });

  // 🆕 Effect: Pre-fill data
  useEffect(() => {
    if (initialData) {
      setFormData({
        freetime: initialData.available_time || "",
        schedule: initialData.schedule || "",
      });
    }
  }, [initialData, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Điều chỉnh lịch học</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Thời gian rảnh</Label>
            <Input
              value={formData.freetime}
              onChange={(e) =>
                setFormData({ ...formData, freetime: e.target.value })
              }
              placeholder="VD: 2 tiếng mỗi ngày"
            />
          </div>
          <div className="grid gap-2">
            <Label>Lịch học mong muốn</Label>
            <Input
              value={formData.schedule}
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
              placeholder="VD: Tối 2-4-6"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button onClick={() => onSubmit(formData)} disabled={isLoading}>
            {isLoading ? "Lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
