import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://openspecter.com"),
    title: "OpenSpecter - Enterprise Grade Legal Work, for free.",
    description:
        "Enterprise document analysis, legal research, and contract review, without the $1,200/seat price tag. Free, self-hosted, and built by Quantera.",
    icons: {
        icon: [
            { url: "/icon.png", type: "image/png" },
            { url: "/favicon.ico" },
        ],
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        title: "OpenSpecter - Enterprise Grade Legal Work, for free.",
        description:
            "Enterprise document analysis, legal research, and contract review, without the $1,200/seat price tag. Free, self-hosted, and built by Quantera.",
        url: "https://openspecter.com",
        siteName: "OpenSpecter",
        images: [
            {
                url: "/og-image.png",
                width: 1024,
                height: 572,
                alt: "OpenSpecter - Enterprise Grade Legal Work, for free.",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "OpenSpecter - Enterprise Grade Legal Work, for free.",
        description:
            "Enterprise document analysis, legal research, and contract review, without the $1,200/seat price tag. Free, self-hosted, and built by Quantera.",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
