import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // إعادة التمرير إلى أعلى الصفحة (0, 0) عند تغيير المسار
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // هذا المكون لا يعرض أي شيء على الشاشة
}

export default ScrollToTop;