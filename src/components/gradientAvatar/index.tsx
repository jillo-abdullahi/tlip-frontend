import { createHash } from "crypto";

export const GradientAvatar: React.FC<{ uuid: string; dimensions: string }> = ({
  uuid,
  dimensions,
}) => {
  // create a unique color based on the uuid
  const generateGradientAvatar = (uuid: string): string => {
    // Hash the UUID using SHA-256
    const hash = createHash("sha256").update(uuid).digest("hex");

    // Get two color values from the hashed UUID
    const color1 = `#${hash.slice(0, 6)}`;
    const color2 = `#${hash.slice(6, 12)}`;

    // Create a gradient style for the avatar
    const gradientStyle = `linear-gradient(135deg, ${color1}, ${color2})`;

    return gradientStyle;
  };

  // Generate a gradient avatar for the user
  const gradientAvatar = generateGradientAvatar(uuid);
  return (
    <div
      style={{
        background: gradientAvatar,
        width: `${dimensions}`,
        height: `${dimensions}`,
        borderRadius: "50%",
      }}
    />
  );
};
