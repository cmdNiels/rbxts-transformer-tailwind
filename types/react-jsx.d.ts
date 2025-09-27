// Tailwind className support for Roblox React elements
declare namespace JSX {
	interface IntrinsicElements {
		// GUI Elements
		frame: React.InstanceProps<Frame> & { className?: string };
		scrollingframe: React.InstanceProps<ScrollingFrame> & { className?: string };
		canvasgroup: React.InstanceProps<CanvasGroup> & { className?: string };

		// Text Elements
		textlabel: React.InstanceProps<TextLabel> & { className?: string };
		textbutton: React.InstanceProps<TextButton> & { className?: string };
		textbox: React.InstanceProps<TextBox> & { className?: string };

		// Image Elements
		imagelabel: React.InstanceProps<ImageLabel> & { className?: string };
		imagebutton: React.InstanceProps<ImageButton> & { className?: string };

		// UI Elements
		uipadding: React.InstanceProps<UIPadding> & { className?: string };
		uicorner: React.InstanceProps<UICorner> & { className?: string };
		uistroke: React.InstanceProps<UIStroke> & { className?: string };
		uilistlayout: React.InstanceProps<UIListLayout> & { className?: string };
		uigridlayout: React.InstanceProps<UIGridLayout> & { className?: string };
		uitablelayout: React.InstanceProps<UITableLayout> & { className?: string };
		uipagelayout: React.InstanceProps<UIPageLayout> & { className?: string };
		uiaspectratio: React.InstanceProps<UIAspectRatioConstraint> & { className?: string };
		uisizeconstraint: React.InstanceProps<UISizeConstraint> & { className?: string };
		uitextsize: React.InstanceProps<UITextSizeConstraint> & { className?: string };
		uiscale: React.InstanceProps<UIScale> & { className?: string };
		uigradient: React.InstanceProps<UIGradient> & { className?: string };

		// ViewportFrame
		viewportframe: React.InstanceProps<ViewportFrame> & { className?: string };

		// Video Frame
		videoframe: React.InstanceProps<VideoFrame> & { className?: string };
	}
}
