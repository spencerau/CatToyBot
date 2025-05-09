#ifndef DATA_PACKET_H
#define DATA_PACKET_H

#include <stdint.h>

// 3‑byte packet: 1 byte cmd + 1 byte speed + 1 byte turn
struct __attribute__((packed)) DataPacket {
  char    cmd;    // e.g. 'd','s'
  int8_t  speed;  // –128…127
  int8_t  turn;   // –128…127
};

static_assert(sizeof(DataPacket) == 3, "DataPacket must be 3 bytes");

void handlePacket(const DataPacket &pkt);

#endif // DATA_PACKET_H