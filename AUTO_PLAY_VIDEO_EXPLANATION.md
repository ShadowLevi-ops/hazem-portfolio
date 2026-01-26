# Auto-Playing Videos with Stable Footage

## How Professional Portfolio Sites Do It

---

## 🎬 **TECHNIQUES FOR AUTO-PLAYING VIDEOS**

### 1. **Intersection Observer API**

**What it does:**

- Detects when video elements enter/exit the viewport
- Only plays videos that are visible
- Pauses videos when scrolled away
- Saves bandwidth and improves performance

**Why it works:**

- Videos only play when users can see them
- Better performance (doesn't load all videos at once)
- Better user experience (no wasted bandwidth)

---

### 2. **Video Attributes for Stability**

**Essential attributes:**

- `muted` - Required for autoplay (browser policy)
- `loop` - Continuous playback
- `playsInline` - Prevents fullscreen on mobile
- `preload="metadata"` - Loads video info without full download
- `object-fit: cover` - Maintains aspect ratio, fills container

**For stability:**

- `object-position: center` - Keeps video centered
- Proper aspect ratios (9:16 for vertical videos)
- Optimized video encoding (H.264, appropriate bitrates)

---

### 3. **Video Encoding Best Practices**

**For stable footage:**

- **Codec**: H.264 (widest compatibility)
- **Bitrate**: 2-5 Mbps for web (balance quality/size)
- **Resolution**: Match display size (don't use 4K for 1080p display)
- **Frame rate**: 24-30fps (cinematic feel, smaller file)
- **Keyframe interval**: Every 2-3 seconds

**Tools:**

- HandBrake (free, open-source)
- FFmpeg (command-line)
- Adobe Media Encoder

---

### 4. **Performance Optimization**

**Lazy loading:**

- Only load videos when needed
- Use `preload="none"` initially
- Switch to `preload="metadata"` when in viewport

**Intersection Observer settings:**

- `threshold: 0.5` - Play when 50% visible
- `rootMargin: "50px"` - Start loading slightly before visible

---

## 🔧 **IMPLEMENTATION**

### Current Implementation (Hover-based):

```tsx
<video
  onMouseEnter={e => v.play()}
  onMouseLeave={e => v.pause()}
  preload="none"
/>
```

### Auto-play Implementation (Viewport-based):

```tsx
<video
  ref={videoRef}
  muted
  loop
  playsInline
  preload="metadata"
  className="object-cover object-center"
/>
```

**With Intersection Observer:**

- Watch for video entering viewport
- Play when visible
- Pause when hidden
- Clean up on unmount

---

## 📊 **COMPARISON**

| Feature          | Hover (Current) | Auto-play (Pro) |
| ---------------- | --------------- | --------------- |
| User interaction | Required        | None needed     |
| Performance      | Good            | Better (lazy)   |
| Engagement       | Medium          | Higher          |
| Bandwidth        | Medium          | Optimized       |
| Mobile friendly  | Limited         | Better          |

---

## 🎯 **RECOMMENDATION**

**For your portfolio:**

- Use **Intersection Observer** for auto-play
- Keep videos **muted** and **looping**
- Use **preload="metadata"** for performance
- Maintain **object-fit: cover** for stability
- Optimize video files (proper encoding)

**Benefits:**

- More engaging (videos play automatically)
- Professional appearance
- Better mobile experience
- Optimized performance

---

**Would you like me to implement auto-playing videos with Intersection Observer? It will make your portfolio more dynamic and professional while maintaining performance.**
