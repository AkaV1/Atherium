import QtQuick 2.0;
import calamares.slideshow 1.0;

Presentation {
    id: presentation

    Timer {
        interval: 7000
        running: presentation.activatedInCalamares
        repeat: true
        onTriggered: presentation.goToNextSlide()
    }

    Slide {
        Rectangle { anchors.fill: parent; color: "#1d1b20" }
        Image {
            id: logo1
            source: "icon.png"
            width: 150; height: 150
            fillMode: Image.PreserveAspectFit
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            anchors.verticalCenterOffset: -60
        }
        Text {
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.top: logo1.bottom
            anchors.topMargin: 24
            text: "Bienvenido a Atherium"
            color: "#e6e0e9"
            font.pixelSize: 28
        }
        Text {
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 40
            text: "Estamos instalando tu sistema. Esto tardara unos minutos."
            color: "#cac4d0"
            font.pixelSize: 15
        }
    }

    Slide {
        Rectangle { anchors.fill: parent; color: "#1d1b20" }
        Text {
            anchors.centerIn: parent
            horizontalAlignment: Text.AlignHCenter
            text: "Estilo Material You\nBarra tipo Windows 11, iconos como en Android\ny ventanas translucidas"
            color: "#d0bcff"
            font.pixelSize: 24
        }
    }

    Slide {
        Rectangle { anchors.fill: parent; color: "#1d1b20" }
        Text {
            anchors.centerIn: parent
            horizontalAlignment: Text.AlignHCenter
            text: "Todo listo para trabajar\nLibreOffice, Firefox y la tienda Bazaar\nya vienen incluidos"
            color: "#efb8c8"
            font.pixelSize: 24
        }
    }

    Slide {
        Rectangle { anchors.fill: parent; color: "#1d1b20" }
        Text {
            anchors.centerIn: parent
            horizontalAlignment: Text.AlignHCenter
            text: "Android y Play Store\nEjecuta tus apps de Android\ndesde el menu \"Android\""
            color: "#a8dab5"
            font.pixelSize: 24
        }
    }

    Slide {
        Rectangle { anchors.fill: parent; color: "#1d1b20" }
        Text {
            anchors.centerIn: parent
            horizontalAlignment: Text.AlignHCenter
            text: "Widgets en tu escritorio\nReloj, fecha y rendimiento\nsiempre a la vista"
            color: "#80deea"
            font.pixelSize: 24
        }
    }

    function onActivate() { }
    function onLeave() { }
}
