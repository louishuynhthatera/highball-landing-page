// app/(landing)/layout.tsx
import VideoBackground from "@/components/VideoBackground";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="video-wrapper">
        <VideoBackground />
      </div>
      {children}
    </>
  );
}